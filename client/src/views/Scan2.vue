<template>
    <v-container>
      <div v-if="this.barcodes.length > 0">
    <h1>Barcode in Array</h1>
  </div>
    <p class="display-4 text-center">Scan Barcodes</p>
    <v-card
      :class="`d-flex justify-center flex-wrap`"
      flat
      tile
    >
      <v-btn @click="startScan()" color="primary">Scan</v-btn>
      <v-btn @click="stopScan()" color="error">Stop</v-btn>
  <div id="interactive" class="viewport scanner">
    <video />
    <canvas class="drawingBuffer" />
  </div>

  

    </v-card>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Quagga from 'quagga';

@Component({
  components: {
    Quagga,
  }
})
export default class Scan2 extends Vue {

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

  startScan() {
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
    Quagga.stop();
  }

  onDetected(result) {
      console.log('detected: ', result);
      
      Quagga.stop();
      console.log(this.barcodes);
      this.barcodes.push(result);
      console.log(this.barcodes);
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