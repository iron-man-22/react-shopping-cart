import { Fragment, useContext } from "react";
import { ShoppingCartContext } from "../../context";
import './index.css';

function CartTile({singleCartItem}){
    const {RemoveFromCart,handleAddToCart}=useContext(ShoppingCartContext);
    return (
        <Fragment>
            <div className="grid grid-cols-3 items-start gap-5">
        <div className="col-span-2 flex items-start gap-4">
            <div className="w-28 h-28 max-sm:w-20 shrink-0 bg-gray-400 p-1 rounded-sm">
                <img
                    src={singleCartItem.thumbnail}
                    className="w-full h-full object-contain"
                />
            </div>
            <div>
                <h3 className="text-base font-bold text-gray-900 ">{singleCartItem.title}</h3>
                <button onClick={()=>RemoveFromCart(singleCartItem,true)} className="cart-bt">Remove</button>
            </div>
        </div>
        <div className="ml-auto">
            <h3 className="text-lg font-bold text-gray-900">${singleCartItem.totalPrice.toFixed(2)}</h3>
            <p className="mt-2 mb-3 font-bold">Quantity : {singleCartItem.quantity}</p>
            <button disabled={singleCartItem.quantity===1} onClick={()=>RemoveFromCart(singleCartItem,false)} style={{ borderStyle:'dashed',backgroundColor:'gray',opacity:singleCartItem.quantity===1?0.5:1,cursor:singleCartItem.quantity===1?'not-allowed':'pointer',fontSize:'13px',marginRight:'8px'}}>-</button>
            <button onClick={()=>handleAddToCart(singleCartItem)} style={{borderStyle:'dashed',backgroundColor:'gray',fontSize:'13px'}}>+</button>
        </div>
    </div>
    <hr className="border-gray-500" />
        </Fragment>
    );
}

export default CartTile;