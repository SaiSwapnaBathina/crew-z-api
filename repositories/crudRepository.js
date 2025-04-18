export default class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  create = async (data) => {
    try {
      const doc = new this.model(data);
      return await doc.save(); // triggers pre('save') hooks
    } catch (error) {
      throw new Error(`Error while creating document: ${error.message}`);
    }
  };

  findOne = async (query) => {
    try {
      const doc = await this.model.findOne(query);
      return doc;
    } catch (error) {
      throw new Error(`Error while finding document: ${error.message}`);
    }
  };

  findById = async (id) => {
    try {
      const doc = await this.model.findById(id).exec();
      if (!doc) throw new Error("Document not found");
      return doc;
    } catch (error) {
      throw new Error(`Error while finding document by ID: ${error.message}`);
    }
  };

  find = async (query) => {
    try {
      const docs = await this.model.find(query);
      return docs;
    } catch (error) {
      throw new Error(`Error while finding documents: ${error.message}`);
    }
  };

  findByIdAndUpdate = async (id, data) => {
    try {
      const doc = await this.model.findById(id).exec();
      if (!doc) throw new Error("Document not found for update");

      Object.assign(doc, data);
      return await doc.save(); // triggers pre('save') hooks
    } catch (error) {
      throw new Error(`Error while updating document by ID: ${error.message}`);
    }
  };

  updateOne = async (query, data) => {
    try {
      const doc = await this.model.findOne(query).exec();
      if (!doc) throw new Error("Document not found for update");

      Object.assign(doc, data);
      return await doc.save(); // triggers pre('save') hooks
    } catch (error) {
      throw new Error(`Error while updating document: ${error.message}`);
    }
  };

  findByIdAndDelete = async (id) => {
    try {
      const doc = await this.model.findByIdAndDelete(id);
      return doc;
    } catch (error) {
      throw new Error(`Error while deleting document by ID: ${error.message}`);
    }
  };

  deleteOne = async (query) => {
    try {
      const result = await this.model.deleteOne(query);
      return result;
    } catch (error) {
      throw new Error(`Error while deleting document: ${error.message}`);
    }
  };
   // **New: bulk delete**
  deleteMany = async (filter, options = {}) => {
    try {
      return await this.model.deleteMany(filter, options).exec();
    } catch (error) {
      throw new Error(`Error while deleting documents: ${error.message}`);
    }
  };
}
