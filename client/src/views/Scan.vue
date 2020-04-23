<template>

  <v-container>
    <p class="display-4 text-center">Scan Barcodes</p>
    <v-card
      :class="`d-flex justify-center flex-wrap`"
      flat
      tile
    >
      <v-btn @click="startScan()" color="primary">Scan</v-btn>
      <v-btn @click="stopScan()" color="error">Stop</v-btn>

      <!-- <div id="yourElement">

      </div> -->

      <div id="interactive" class="viewport scanner">
        <video />
        <canvas class="drawingBuffer" />
      </div>
    </v-card>
  </v-container>

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Quagga from 'quagga'; // ES6

@Component({
  components: {
    Quagga,
  },
})
export default class  extends Vue {

  @Prop({ default: (result) => "" })
  onDetected!: any;

  @Prop({ default: (result) => "" })
  onProcessed!: any;

  // @Prop({ default: "upc_reader" })
  // readerType!: string;

  // @Prop({ default: 320 })
  // readerWidth!: string | number;

  // @Prop({ default: 240 })
  // readerHeight!: string | number;

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
      patchSize: 'large',
      halfSample: true,
    },
    numOfWorkers: 2,
    frequency: 10,
    decoder: {
      readers: [
        "code_128_reader",
        "ean_reader",
        "ean_8_reader",
        "code_39_reader",
        "code_39_vin_reader",
        "codabar_reader",
        "upc_reader",
        "upc_e_reader",
        "i20f5_reader",
        "2of5_reader",
        "code_93_reader"
      ]
    },
    locate: true,
  }

  _onDetected(result) {
    console.log(result);
    Quagga.stop();
  }

  _onProcessed(result) {
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

  mounted() {
    Quagga.init(this.quaggaState, function(err) {
      if (err) {
        return console.error(err);
      }
      Quagga.start();
    });
    // Quagga.onDetected(this.onDetected);
    // Quagga.onProcessed(this.onProcessed);
  }

  destroyed() {
    Quagga.stop();
  }
  

  // startScan() {
  //   Quagga.init(this.quaggaState, function(err) {
  //     if (err) {
  //       console.log(err);
  //       return
  //     }
  //     Quagga.start();
  //   });

  //   Quagga.onDetected(this.onDetected ? this.onDetected : this._onDetected);
  //   Quagga.onProcessed(this.onProcessed ? this.onProcessed : this._onProcessed);
  // }

  stopScan() {
    Quagga.stop();
  }

}

</script>

<style scoped>
#yourElement {
  width: 100%;
  height: 100%;
}

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