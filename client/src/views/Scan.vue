<template>
  <div>
    <v-container v-if="cameraDetected">
      <p class="text-center pageTitle">{{window.width}}  {{window.height}}</p>
      <v-row>
        <v-col>
          <v-card
            :class="`d-flex justify-center flex-wrap`"
            flat
            tile
          >
            <v-btn v-show="showScanBtn" @click="startScan()" color="primary">Scan</v-btn>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div v-if="this.barcodes.length > 0">
            
            <v-row>
              <v-col cols="1">
              </v-col>
              <v-col cols="10">
                <v-form
                  ref="scanForm"
                  v-model="valid"
                >
                  <v-text-field
                    :rules="nameRules"
                    required
                    v-model="scanBarName"
                    label="Name"
                    prepend-icon="mdi-tag"
                  ></v-text-field>
                </v-form>      
              </v-col>
              <v-col cols="1">
              </v-col>
            </v-row>
            <p class="text-center">{{this.barcodes[0].codeResult.format}} type</p>
            <VueBarcode 
              class="text-center" 
              :value="this.barcodes[0].codeResult.code"
              :fontSize="barcodeFontSize"
              >
              Please enter a valid value for this barcode type.
            </VueBarcode>
            <v-row align="center">
              <v-col class="text-center" cols="12" sm="12">
                <div class="my-2">
                  <v-btn @click="reset()" color="error" class="appBtn">Reset</v-btn>
                </div>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col class="text-center" cols="12" sm="12">
                <div class="my-2">
                  <v-btn @click="saveScan()" :disabled="!valid" color="primary" class="appBtn">Save</v-btn>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-container v-else>
      <p class="text-center pageTitle">Scan Barcodes</p>
      <v-card
        :class="`d-flex justify-center flex-wrap`"
        flat
        tile
      >
        <h1 class="text-center noScannerMsg">Sorry, you don't have a camera on this device :(</h1>
      </v-card>
    </v-container>

    <div v-show="showVideo" :style="videoCenter" id="interactive" class="viewport scanner">
      <video />
      <canvas class="drawingBuffer" />
      <v-btn v-if="this.window.width >= 897" :style="stopScanCenter" @click="stopScan()" color="error">Stop</v-btn>
    </div>

    <v-col>
      <v-row>
        <v-btn justify-center v-if="this.window.width <= 896 && showVideo" class="mobileStopScanCenter justify-center" @click="stopScan()" color="error">Stop</v-btn>
      </v-row>
    </v-col>

  <SnackBar :snackbar="snackInit"/>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import Quagga from 'quagga';
import VueBarcode from 'vue-barcode';
import { v4 as uuidv4 } from 'uuid';
import SnackBar from '@/components/SnackBar.vue';

@Component({
  components: {
    Quagga,
    VueBarcode,
    SnackBar
  }
})
export default class Scan extends Vue {

  // Data
  cameraDetected: boolean = false;
  snackInit: boolean = false;
  valid: boolean = false;
  showScanBtn: boolean = true;
  scanBarName: string = "";
  window: any = {
    height: 0,
    width: 0
  };
  showVideo: boolean = false;
  barcodes: any = [];
  Quagga: any;

  // Methods
  reset() {
    this.scanBarName = "";
    this.barcodes = [];
    this.showVideo = false;
    this.showScanBtn = true;
  }

  startScan() {
    this.barcodes = [];
    this.showVideo = true;
    this.showScanBtn = false;

    Quagga.init({
      inputStream: {
        type: 'LiveStream',
        constraints: {
          width: this.scannerWidth,
          height: this.scannerHeight,
          facingMode: 'environment',
          aspectRatio: { min: 1, max: 2 },
        },
      },
      locator: {
        patchSize: 'medium',
        halfSample: true,
      },
      numOfWorkers: 2,
      frequency: 10,
      decoder: {
        readers: [
          // "code_128_reader",
          "ean_reader",
          // "ean_8_reader",
          // "ean_5_reader",
          // "ean_2_reader",
          // "code_39_reader",
          // "code_39_vin_reader",
          // "codabar_reader",
          // "upc_reader",
          // "upc_e_reader",
          // "code_93_reader"
        ],
      },
      locate: true,
    }, function(err: any) {
      if (err) {
        return console.error(err);
      }
      Quagga.start();
    });
    Quagga.onDetected(this.onDetected);
    Quagga.onProcessed(this.onProcessed);
  }

  stopScan() {
    this.reset();
    Quagga.stop();
    this.showScanBtn = true;
  }

  async saveScan() {
    await this.$store.dispatch("saveBarcode", {
      barcode: this.buildBarcode()
    }).then(success => {
      this.reset();
      this.snackInit = true;
      setTimeout(() => {
        this.snackInit = false
      }, 2000);
    })
  }

  onDetected(result: any) {
    // Empty barcodes arr
    this.barcodes = [];    
    Quagga.stop();
    this.barcodes.push(result);
    this.showVideo = false;
  }

  onProcessed(result: any) {
    let drawingCtx = Quagga.canvas.ctx.overlay;
    let drawingCanvas = Quagga.canvas.dom.overlay;

    if (result) {
      if (result.boxes) {
        drawingCtx.clearRect(
          0,
          0,
          parseInt(drawingCanvas.getAttribute('width')),
          parseInt(drawingCanvas.getAttribute('height'))
        );
        result.boxes
          .filter(function(box: any) {
            return box !== result.box;
          })
          .forEach(function(box: any) {
            Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
              color: 'green',
              lineWidth: 2,
            });
          });
      }
      if (result.box) {
        Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
          color: '#00F',
          lineWidth: 2,
        });
      }

      if (result.codeResult && result.codeResult.code) {
        Quagga.ImageDebug.drawPath(
          result.line,
          { x: 'x', y: 'y' },
          drawingCtx,
          { color: 'red', lineWidth: 3 }
        );
      }
    }
  }

  buildBarcode() {
    if (this.barcodes[0].codeResult.format === "ean_13") {
      this.barcodes[0].codeResult.format = "EAN13";
    }

    const bar = {
      id: uuidv4(),
      name: this.scanBarName,
      type: this.barcodes[0].codeResult.format,
      value: this.barcodes[0].codeResult.code
    };
    return bar;
  }

  checkUserCamera() {
    navigator.mediaDevices.enumerateDevices()
      .then((devices: any) =>{
        for (let d of devices) {
          if (d.kind === "videoinput") {
            this.cameraDetected = true;
          }
        }
      })
      .catch((err: any) => {
        console.log(err.name + ": " + err.message);
      });
  }

  // Lifecycle Events

  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
    this.checkUserCamera();
  }

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
    if (this.showVideo === true) {
      this.stopScan();
    }
    // Quagga.stop();
  }
  
  handleResize() {
    this.window.width = window.innerWidth;
    this.window.height = window.innerHeight;
  }

  @Watch('window.width')
  checkWindowResize() {
    if (this.showVideo === true) {
      this.stopScan();
    }
  }

  // Getters
  get barcodeFontSize() {
    if (this.window.width >= 4096) {
      return "50"
    } else if (this.window.width >= 3840 && this.window.width <= 4095) {
      return "40"
    } else if (this.window.width >= 2560 && this.window.width <= 3839) {
      return "30"
    } else {
      return "20"
    }
  }

  get scannerWidth() {
    if (this.window.width >= 897) {
      return 640;
    } else {
      return 320;
    }
  }

  get scannerHeight() {
    if (this.window.width >= 897) {
      return 480;
    } else {
      return 240;
    }
  }

  get videoCenter() {
    let marginLeft: any = 0;

    if (this.window.width >= 897) {
      marginLeft = (this.window.width - 640) / 2;
      return `margin-left: ${marginLeft}px`
    }

    if (this.window.width <= 896) {
      marginLeft = (this.window.width - 320) / 2;
      return `margin-left: ${marginLeft}px`
    }
  }

  get stopScanCenter() {
    let marginLeft: any = 0;

    marginLeft = (640 -64) / 2;
    return `margin-left: ${marginLeft}px;
            margin-top: 20px;`
  }

  get nameRules() {
    let rules = [(v: any) => !!v || 'Name is required',
                 (v: any) => (v && (v.length >= 1 && v.length <= 25)) || `Barcode name must be between 1 and 25 characters`,
                ];
    return rules;
  }
  
};
</script>

<style scoped>
.viewport {
  position: relative;
}

.viewport canvas,
.viewport video {
  position: absolute;
  left: 0;
  top: 0;
}

#interactive button {
  border: 1px solid black !important;
}

.mobileStopScanCenter {
  margin-top: 300px !important;
  margin: 0 auto;
  border: 1px solid black !important;
}

</style>