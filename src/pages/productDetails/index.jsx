import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShoppingCartContext } from "../../context";
import './index.css';


function ProductDetailsPage(){
    const {id}=useParams();
    const navigate=useNavigate();
    const {productDetails,setProductDetails,loading,setLoading,handleAddToCart,cartList}=useContext(ShoppingCartContext);
    function handleGoToCart(){
        navigate(`/cart`);
    }
    
    async function fetchProductDetails() {
            try{
                setLoading(true);
                const apiRes=await fetch(`https://dummyjson.com/products/${id}`);
                const res=await apiRes.json();
                if(res){ 
                setProductDetails(res);
                setLoading(false);
                } 
            }catch(error){
                console.log(error);
            }
       
       

    }
    useEffect(()=>{
        setProductDetails(null);
        fetchProductDetails();
    },[id]);

    if(loading|| !productDetails){
        return <div className="text-center">Loading..</div>
    }

    console.log(productDetails);
    return <div className="p-6 lg:max-w-7xl max-w-4xl mx-auto">
        <div className="grid items-center grid-cols-1 lg:grid-cols-5 gap-12  p-6">
            <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
            <div className="px-4 py-10 rounded-xl shadow-xl relative">
                <img
                    className="w-4/5 rounded object-cover ml-10"
                    src={productDetails.thumbnail}
                    alt={productDetails.title}
                />
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto">
                {
                    productDetails.images.length ?
                    productDetails.images.map(imageItem=> 
                        <div className="rounded-xl p-4 shadow-md" key={imageItem}>
                            <img src={imageItem}
                            alt='Product Image 2'
                            className="w-24 cursor-pointer"
                            />
                        </div>   
                    ):null
                }
            </div>
            </div>
            <div className="lg:col-span-2 flex flex-col items-end gap-4">
                <h2 className="text-2xl font-extrabold text-[#333333]">{productDetails.title}</h2>
                <p className="text-xl font-bold">${productDetails.price}</p>
                <div className="flex gap-2 justify-end">
                <button onClick={()=>navigate('/cart')} className="view-details-bt">
                    Goto Cart
                </button>
                <button disabled={cartList.findIndex(item=>item.id===productDetails.id)>-1} onClick={()=>handleAddToCart(productDetails)} className="view-details-bt" style={{opacity:(cartList.findIndex(item=>item.id===productDetails.id)>-1)?0.5:1}}>{(cartList.findIndex(item=>item.id===productDetails.id)>-1)?'Alredy Added':'Add To Cart'}</button>
                </div>
            </div>
        </div>    
    </div>;
}

export default ProductDetailsPage;