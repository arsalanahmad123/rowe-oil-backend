const bcrypt = require("bcryptjs");
const UserModel = require("../../models/userModel");

async function updateUserById(req, res) {
  console.log("here");
  try {
    const {
      email,
      salutation,
      firstName,
      surName,
      address,
      houseNumber,
      addressAddendum,
      postCode,
      city,
      country,
      oldPassword,
      newPassword,
      role,
      primaryCustomerOrBusinessCustomer,
      accept,
      image,
      id,
    } = req.body;
    console.log("id :: ", id);
    const payload = {
      ...(email && { email }),
      ...(salutation && { salutation }),
      ...(firstName && { firstName }),
      ...(surName && { surName }),
      ...(address && { address }),
      ...(houseNumber && { houseNumber }),
      ...(addressAddendum && { addressAddendum }),
      ...(postCode && { postCode }),
      ...(city && { city }),
      ...(country && { country }),
      ...(role && { role }),
      ...(image && { image }),
      ...(primaryCustomerOrBusinessCustomer && {
        primaryCustomerOrBusinessCustomer,
      }),
      ...(accept !== undefined && { accept }),
    };

    const user = await UserModel.findById(id);
    console.log("user :: ", user);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }
    if (newPassword && oldPassword) {
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({
          message: "Invalid credentials",
          error: true,
          success: false,
        });
      }
      // Hash the new password before saving
      payload.password = await bcrypt.hash(newPassword, 10);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(id, payload, {
      new: true,
    });

    res.status(200).json({
      message: "User Updated",
      error: false,
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = updateUserById;
