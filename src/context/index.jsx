import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const ShoppingCartContext=createContext(null);


function ShoppinCartProvider({children}){
    const [loading,setLoading]=useState(true);
    const [listOfProducts,setListOfProducts]=useState([]);
    const [productDetails,setProductDetails]=useState(null);
    const [cartList,setCartList]=useState([]);
    const navigate=useNavigate();

    async function fetchListOfProducts() {
        const apiRes=await fetch('https://dummyjson.com/products');
        const res=await apiRes.json();
        console.log(res);
        if(res && res?.products){
            setListOfProducts(res?.products);
            setLoading(false);
        }
    }
    function handleAddToCart(getCurrentProduct){
        console.log(getCurrentProduct);

        let cpyExistingItems=[...cartList];
        const findIndexOfCurrentItem=cpyExistingItems.findIndex(cartItem=>cartItem.id===getCurrentProduct.id);
        console.log(findIndexOfCurrentItem);
        if(findIndexOfCurrentItem===-1){
            cpyExistingItems.push({
                ...getCurrentProduct,
                quantity:1,
                totalPrice:getCurrentProduct.price
            })
        }else{
            
            console.log("Already added");
            cpyExistingItems[findIndexOfCurrentItem]={
                ...cpyExistingItems[findIndexOfCurrentItem],
                quantity:cpyExistingItems[findIndexOfCurrentItem].quantity+1,
                totalPrice:(cpyExistingItems[findIndexOfCurrentItem].quantity+1)*cpyExistingItems[findIndexOfCurrentItem].price,
            }
            

        }
        console.log(cpyExistingItems,"CopyExistingCartItems");
        setCartList(cpyExistingItems);
        localStorage.setItem('cartList',JSON.stringify(cpyExistingItems));
        navigate('/cart');


    }

    function RemoveFromCart(getCurrentProduct,isRemoveFully){
        let cpyExistingItems=[...cartList];
        const findIndexOfCurrentCartItem=cpyExistingItems.findIndex(cartItem=>cartItem.id===getCurrentProduct.id);

        if(isRemoveFully){
            cpyExistingItems.splice(findIndexOfCurrentCartItem,1);
        }else{
            cpyExistingItems[findIndexOfCurrentCartItem]={
                ...cpyExistingItems[findIndexOfCurrentCartItem],
                quantity:cpyExistingItems[findIndexOfCurrentCartItem].quantity-1,
                totalPrice:(cpyExistingItems[findIndexOfCurrentCartItem].quantity-1)*cpyExistingItems[findIndexOfCurrentCartItem].price,
            }
        }
        localStorage.setItem('cartList',JSON.stringify(cpyExistingItems));
        setCartList(cpyExistingItems);
    }
    useEffect(()=>{
        fetchListOfProducts();
        setCartList(JSON.parse(localStorage.getItem('cartList')||'[]'))
    },[]);
    console.log(cartList);
    return ( <ShoppingCartContext.Provider value={{listOfProducts,setLoading,loading,productDetails,setProductDetails,handleAddToCart,cartList,setCartList,
        RemoveFromCart,
    }}>
                {children}
        </ShoppingCartContext.Provider>

    );
}

export default ShoppinCartProvider;