const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Invoice = require('./invoiceModel');

const orderSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ['waiting_payment', 'processing', 'in_delivery', 'delivered'],
      default: 'waiting_payment',
    },
    delivery_fee: {
      type: Number,
      default: 0,
    },
    delivery_address: {
      province: { type: String, required: [true, 'Province required'] },
      regency: { type: String, required: [true, 'Regency required'] },
      district: { type: String, required: [true, 'District required'] },
      village: { type: String, required: [true, 'Urban village required'] },
      detail: { type: String },
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    order_items: [{ type: mongoose.Schema.ObjectId, ref: 'OrderItem' }],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

orderSchema.plugin(AutoIncrement, { inc_field: 'order_number' });

orderSchema.virtual('items_count').get(function () {
  return this.order_items.reduce(
    (total, item) => total + parseInt(item.quantity),
    0
  );
});

orderSchema.virtual('totalPrice').get(function () {
  return this.order_items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
});

orderSchema.post('save', async function () {
  let sub_total = this.order_items.reduce(
    (total, item) => (total += item.price * item.quantity),
    0
  );

  let invoice = new Invoice({
    user: this.user,
    order: this._id,
    sub_total: sub_total,
    delivery_fee: parseInt(this.delivery_fee),
    total: parseInt(sub_total + this.delivery_fee),
    delivery_address: this.delivery_address,
  });

  await invoice.save();
});

module.exports = mongoose.model('Order', orderSchema);
