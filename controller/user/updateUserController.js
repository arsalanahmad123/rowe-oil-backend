const bcrypt = require("bcryptjs");
const UserModel = require("../../models/userModel");

async function updateUserController(req, res) {
  try {
    const sessionUser = req.userId;
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
    } = req.body;

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

    const user = await UserModel.findById(sessionUser);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }
    console.log("image :: ", image);
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

    const updatedUser = await UserModel.findByIdAndUpdate(
      sessionUser,
      payload,
      { new: true }
    );

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

module.exports = updateUserController;
