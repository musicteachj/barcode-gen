<template>
  <div>
    <v-container v-if="cameraDetected">
      <p class="text-center pageTitle">Scan Barcodeszzz</p>
      <v-row>
        <v-col>
          <v-card
            :class="`d-flex justify-center flex-wrap`"
            flat
            tile
          >
            <v-btn 
              v-show="showScanBtn" 
              @click="startScan()" 
              color="primary"
              :disabled="excededBarcodeLimit">
                Scan
            </v-btn>
          </v-card>
          <div v-if="this.barcodes.length >= 20" class="mt-9">
            <p class="noScannerMsg text-center">Exceeded Barcode Limit Of 20</p>
            <p class="noScannerMsg text-center mt-6">Head To Print Page And Delete Some!</p>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div v-if="this.scannedBarcodes.length > 0">
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
            <VueBarcode 
              class="text-center" 
              :value="this.scannedBarcodes[0].codeResult.code"
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
      <p class="text-center pageTitle">Scan Barcodeszzz</p>
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
import { Component, Vue, Prop, Watch, Mixins } from 'vue-property-decorator';
import Quagga from 'quagga';
import VueBarcode from 'vue-barcode';
import { v4 as uuidv4 } from 'uuid';
import SnackBar from '@/components/SnackBar.vue';
import { mapState } from 'vuex';
import ViewsStylings from "../mixins/ViewsStylings.vue";

@Component({
  components: {
    Quagga,
    VueBarcode,
    SnackBar
  },
  computed: {
    ...mapState(["barcodes"])
  }
})
export default class Scan extends Mixins(ViewsStylings) {
  // Mapped Variables ----------------
  // ---------------------------------
  barcodes!: any;

  // Local Variables -----------------
  // ---------------------------------
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
  scannedBarcodes: any = [];
  Quagga: any;

  // Computed ------------------------
  // ---------------------------------
  get excededBarcodeLimit() {
    return this.barcodes.length >= 20 ? true : false;
  }

  get barcodeFontSize() {
    if (this.window.width >= 4096) return "50"
    if (this.window.width >= 3840 && this.window.width <= 4095) return "40"
    if (this.window.width >= 2560 && this.window.width <= 3839) return "30"
    return "20"
  }

  get scannerWidth() {
    return this.window.width >= 897 ? 640 : 320;
  }

  get scannerHeight() {
    return this.window.width >= 897 ? 480 : 240;
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
    let rules = [
      (v: any) => !!v || 'Name is required',
      (v: any) => (v && (v.length >= 1 && v.length <= 13)) || `Barcode name must be between 1 and 13 characters`,
    ];
    return rules;
  }

  // Watchers ------------------------
  // ---------------------------------
  @Watch('window.width')
  checkWindowResize() {
    if (this.showVideo) {
      this.stopScan();
    }
  }

  // Lifecycle Events ----------------
  // ---------------------------------
  created() {
    this.$store.dispatch("retrieveBarcodes");
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
    this.checkUserCamera();
  }

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
    if (this.showVideo) {
      this.stopScan();
    }
  }

  // Methods -------------------------
  // ---------------------------------
  reset() {
    this.scanBarName = "";
    this.scannedBarcodes = [];
    this.showVideo = false;
    this.showScanBtn = true;
  }

  startScan() {
    this.scannedBarcodes = [];
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
          // "code_39_reader",
          // "code_39_vin_reader",
          // "codabar_reader",
          // "upc_reader",
          // "upc_e_reader",
          // "i2of5_reader",
          // "2of5_reader",
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
    this.scannedBarcodes = [];    
    Quagga.stop();
    this.scannedBarcodes.push(result);
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
    if (this.scannedBarcodes[0].codeResult.format === "ean_13") {
      this.scannedBarcodes[0].codeResult.format = "EAN13";
    }

    const bar = {
      id: uuidv4(),
      name: this.scanBarName,
      type: this.scannedBarcodes[0].codeResult.format,
      value: this.scannedBarcodes[0].codeResult.code
    };
    return bar;
  }

  checkUserCamera() {
    console.log(navigator);
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
      || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
      this.cameraDetected = true;
    }

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
  
  handleResize() {
    this.window.width = window.innerWidth;
    this.window.height = window.innerHeight;
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