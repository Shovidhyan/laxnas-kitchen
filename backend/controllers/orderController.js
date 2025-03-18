import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";



const placeOrder = async (req, res) => {

  const frontend_url = "http://localhost:5174";
  

  try {
    // Validate the request body
    const { userId, items, amount, address } = req.body;

    if (!userId || !items || items.length === 0 || !amount || !address) {
      return res.status(400).json({
        success: false,
        message: "Invalid request data. Please provide all required fields.",
      });
    }


    // Save the order in the database
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
    });

    await newOrder.save();

    // Clear the user's cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // Respond with success message
    res.json({
      success: false,
      message: "Order placed successfully. We will contact you soon.",
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({
      success: true,
      message: "Order placement failed. Please try again later.",
    });
  }
};

const verifyOrder = async (req, res) => {
  const {orderId,success} = req.body;
  try{
    if(success=="true"){
      await orderModel.findByIdAndUpdate(orderId,{payment:"true"});
      res.json({success:true,message:"Order verified successfully."});
    }else{
      await orderModel.findByIdAndDelete(orderId);
      res.json({success:false,message:"Order verification failed."});
    }
  }catch (error){
      console.log(error);
      res.json({success:false,message:"Error"});
  }

}

//user orders for frontend
const userOrders = async (req,res) =>{
  try {
    const orders = await orderModel.find({userId:req.body.userId})
    res.json({success:true,data:orders})
    
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
    
    
  }

} 



//listing orders for admin panel

const listOrders = async (req,res) =>{
  try {
    const orders = await orderModel.find({});
    res.json({success:true,data:orders})
    
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
    
    
  }

}


//text api for updating ordering status

const updateStatus = async (req,res) =>{
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
    res.json({success:true,message:"Status updated successfully."});
}
catch (error){
    console.log(error);
    res.json({success:false,message:"Error"});
}
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus};
