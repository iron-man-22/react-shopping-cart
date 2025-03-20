import { useContext } from "react";
import { ShoppingCartContext } from "../../context";
import "./index.css"
import { useNavigate } from "react-router-dom";
import CartTile from "../../components/cartTile";


function CartPage(){
    const {cartList}=useContext(ShoppingCartContext);
    const navigate=useNavigate();
    return <div className="max-w-5xl mx-auto max-md:max-w-xl py-4">
        
        <h1 className="text-2xl font-bold text-gray-800 text-center">Cart Page</h1>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="ml-20 md:col-span-2 space-y-4">
                {cartList.length ?
                cartList.map(singleCartItem=><CartTile key={singleCartItem.id} singleCartItem={singleCartItem}/>)
                : <h2>No Items in the Cart.Please add Items..</h2>}
            </div>
            <div className="ml-20 bg-gray-100 rounded-sm p-4 h-max">
                <h3 className="text-xl font-extrabold text-gray-950">Order Summary</h3>
                <ul className="text-gray-700 mt-4 space-y-2">
                    <p className="flex flex-wrap gap-4 text-sm font-bold">Total ${cartList.reduce((acc,curr)=> acc+curr.totalPrice,0).toFixed(2)} <span></span></p>
                </ul>
                <div className="mt-4 flex gap-2">
                    <button className="cart-btn">Checkout</button>
                    <button className="cart-btn" onClick={()=>navigate('/product-list')}>Continue Shopping</button>
                </div>
            </div>
        </div>
    </div>;
}

export default CartPage;