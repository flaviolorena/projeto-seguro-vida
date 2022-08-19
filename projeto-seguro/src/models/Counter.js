import {MongooseAutoIncrementID} from 'mongoose-auto-increment-reworked';
import * as mongoose from 'mongoose';
 
const MySchema = new mongoose.Schema({
  someField: {
    type: String
  }
});
 
/*
 * An optional step - set the name of the schema used by the plugin (defaults to 'IdCounter'). Has no effect if
 * the plugin has already been applied to a schema.
 */
MongooseAutoIncrementID.initialise('MyCustomName');
 
const plugin = new MongooseAutoIncrementID(MySchema, 'MyModel');
 
plugin.applyPlugin()

MySchema.plugin(MongooseAutoIncrementID.plugin, {modelName: 'MyModel'});
 
// Only turn the schema into the model AFTER applyPlugin has been called. You do not need to wait for the promise to resolve.
const MyModel = mongoose.model('MyModel', MySchema);

export default MyModel;