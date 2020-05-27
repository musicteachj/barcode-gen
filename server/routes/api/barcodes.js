const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// GET
router.get('/', async (req, res) => {
  const barcodes = await loadBarcodesCollection();
  res.send(await barcodes.find({}).toArray());
})

// POST
router.post('/', async (req, res) => {
  const barcodes = await loadBarcodesCollection();
  const clientBar = req.body.barcode;
  
  await barcodes.insertOne({
    uuid: clientBar.id,
    name: clientBar.name,
    type: clientBar.type,
    value: clientBar.value,
    createdAt: new Date()
  });
  res.status(201).send();
})

// DELETE
router.delete('/:id', async (req, res) => {
  const barcodes = await loadBarcodesCollection();

  await barcodes.deleteOne({uuid: req.params.id});
  res.status(200).send();
})


async function loadBarcodesCollection() {
  const client = await mongodb.MongoClient.connect
    ('mongodb://musicteachj:abc123@ds159129.mlab.com:59129/barcodes', {
      useNewUrlParser: true
    })

    return client.db('barcodes').collection('barcodes');
}

module.exports = router;