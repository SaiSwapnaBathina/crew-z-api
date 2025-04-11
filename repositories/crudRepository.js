export default class crudRepository {
    constructor(model) {
      this.model = model;
    }
  
    create = async (data) => {
      try {
        return await this.model.create(data);
      } catch (error) {
        throw Error(`Error while creating document: ${error.message}`);
      }
    }
  
    findOne = async (query) => {
      try {
        return await this.model.findOne(query);
      } catch (error) {
        throw Error(`Error while finding document: ${error.message}`);
      }
    }
  
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
        return await this.model.find(query);
      } catch (error) {
        throw Error(`Error while finding documents: ${error.message}`);
      }
    }
  
    findByIdAndUpdate = async (id, data) => {
      try {
        return await this.model.findByIdAndUpdate(id, data, { new: true });
      } catch (error) {
        throw Error(`Error while updating document: ${error.message}`);
      }
    }
  
    findByIdAndDelete = async (id) => {
      try {
        return await this.model.findByIdAndDelete(id);
      } catch (error) {
        throw Error(`Error while deleting document: ${error.message}`);
      }
    }
  
    deleteOne = async (query) => {
      try {
        return await this.model.deleteOne(query);
      } catch (error) {
        throw Error(`Error while deleting document: ${error.message}`);
      }
    }
  
}
  