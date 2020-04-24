<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <p class="display-4 text-center">Scan Barcodes</p>
          <v-card
            :class="`d-flex justify-center flex-wrap`"
            flat
            tile
          >
            <v-btn @click="startScan()" color="primary">Scan</v-btn>
            <v-btn @click="stopScan()" color="error">Stop</v-btn>
          </v-card>
        </v-col>
      </v-row>

      

    <v-row>
      <v-col>
        <div v-if="this.barcodes.length > 0">
          <h1 class="text-center">Barcode in Array</h1>
          <v-row>
          <v-col cols="4">
          </v-col>
          <v-col cols="4">
            <v-text-field
                
                v-model="scanBarName"
                label="Name"
                required
                prepend-icon="mdi-tag"
              ></v-text-field>
          </v-col>
          </v-row>
          <p class="text-center">{{this.barcodes[0].codeResult.format}} type</p>

          <VueBarcode 
            class="text-center" 
            :value="this.barcodes[0].codeResult.code"
            >
            Please enter a valid value for this barcode type.
          </VueBarcode>
          <v-card
            :class="`d-flex justify-center flex-wrap`"
            flat
            tile
          >
            <v-btn @click="reset()" color="error">Reset</v-btn>
            <v-btn @click="saveScan()" color="primary">Save</v-btn>
          </v-card>        
        </div>
      </v-col>
    </v-row>
  </v-container>

  
  <div v-show="showVideo" :style="videoCenter" id="interactive" class="viewport scanner">
    <video />
    <canvas class="drawingBuffer" />
  </div>

  </div>
    
        
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Quagga from 'quagga';
import VueBarcode from 'vue-barcode';


@Component({
  components: {
    Quagga,
    VueBarcode
  }
})
export default class Scan extends Vue {

  scanBarName: string = "";

  window: any = {
    height: 0,
    width: 0
  }

  showVideo: boolean = false;

  barcodes: any = [];

    // readers: [
    //   "code_128_reader",
    //   "ean_reader",
    //   "ean_8_reader",
    //   "ean_5_reader",
    //   "ean_2_reader",
    //   "code_39_reader",
    //   "code_39_vin_reader",
    //   "codabar_reader",
    //   "upc_reader",
    //   "upc_e_reader",
    //   "code_93_reader"
    // ],

  quaggaState: any = {
    inputStream: {
      type: 'LiveStream',
      constraints: {
        width: 640,
        height: 480,
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
  };

  reset() {
    this.scanBarName = "";
    this.barcodes = [];
    this.showVideo = false;
  }

  startScan() {
    this.barcodes = [];

    this.showVideo = true;

    Quagga.init(this.quaggaState, function(err) {
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
  }

  saveScan() {
    console.log("Saved")
  }

  onDetected(result) {
    // Empty barcodes arr
    this.barcodes = [];
    console.log('detected: ', result);
    
    Quagga.stop();
    console.log(this.barcodes);
    this.barcodes.push(result);
    console.log(this.barcodes);
    this.showVideo = false;
  }

  onProcessed(result) {
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
          .filter(function(box) {
            return box !== result.box;
          })
          .forEach(function(box) {
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

  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
  }
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  }
  
  handleResize() {
    this.window.width = window.innerWidth;
    this.window.height = window.innerHeight;
  }

  get videoCenter() {
    let marginLeft: any = 0;

    if (this.window.width <= 640) {
      return ""
    }

    if (this.window.width >= 641) {
      marginLeft = (this.window.width - 640) / 2;
      return `margin-left: ${marginLeft}px`
    }
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

</style>