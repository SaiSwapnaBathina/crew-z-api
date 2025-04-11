import CrudRepository from "./CrudRepository.js";

export default class AuthRepository extends CrudRepository {
  constructor(model) {
    // Accepts a Mongoose model (WorkerModel or ClientModel) during instantiation
    super(model);
    this.model = model;
  }

  // Find a user (worker or client) by their email
  async findByEmail(email) {
    return await this.model.findOne({ email });
  }

  // Find a user by their password reset token, ensuring the token is still valid (i.e. not expired)
  async findByResetToken(token) {
    return await this.model.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
  }

  // Update a user document with a reset token and expiry time
  async assignResetToken(userId, token, expiry) {
    return await this.model.findByIdAndUpdate(
      userId,
      {
        resetPasswordToken: token,
        resetPasswordExpires: expiry
      },
      { new: true }
    );
  }
}
