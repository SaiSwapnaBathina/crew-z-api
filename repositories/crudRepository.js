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

  findOne = async (query, options = {}) => {
    try {
      let dbQuery = this.model.findOne(query);
  
      if (options.session) {
        dbQuery = dbQuery.session(options.session);
      }
  
      return await dbQuery.exec();
    } catch (error) {
      throw new Error(`Error while finding document: ${error.message}`);
    }
  };
  
  // findById = async (id) => {
  //   try {
  //     const doc = await this.model.findById(id).exec();
  //     if (!doc) throw new Error("Document not found");
  //     return doc;
  //   } catch (error) {
  //     throw new Error(`Error while finding document by ID: ${error.message}`);
  //   }
  // };
  async findById(id) {
    try {
      const doc = await this.model.findById(id);
      if (!doc) return null; // <-- return null instead of throwing
      return doc;
    } catch (error) {
      throw new Error(`Error while finding document by ID: ${error.message}`);
    }
  }
  

  find = async (query, populateFields = []) => {
    try {
      let dbQuery = this.model.find(query);
  
      // Optional populate
      if (populateFields.length) {
        populateFields.forEach(field => {
          dbQuery = dbQuery.populate(field);
        });
      }

      return await dbQuery.exec();
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
