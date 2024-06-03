import React from 'react'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button, IconButton } from '@mui/material';
import { removeCartItem, updateCartItem} from '../state/cart/Action';
import { useDispatch } from 'react-redux';


const CartItem = ({product}) => {

    console.log("producttt",product)

    const dispatch=useDispatch();
    
    const handleUpdateCartItem=(num)=>{
        const data={data:{quantity:product.quantity+num},cartItemId:product?.cartItemId}
        dispatch (updateCartItem(data))
      }
    
      const handleRemoveCartItem=()=>{
        dispatch(removeCartItem(product.cartItemId))
    
      }

      


    return(
    <div>

<li key={product.book.bookid} className="flex py-6">
            <div className="h-30 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                    src={require(`../assets/images/${product.book.imageUrl}`)}
                    className="h-full w-full object-cover object-center"
                    alt={product.book.bookname} />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{product.book.bookname}</h3>
                        <p className="ml-4">{product.book.bookprice}.00</p>
                    </div>
                </div>

                <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="mt-5 flex items-center space-x-4">
                        <IconButton onClick={() => handleUpdateCartItem(-1)} disabled={product.quantity <= 1} sx={{ color: 'purple' }}>
                            <RemoveCircleOutlineIcon />
                        </IconButton>
                        <span className="py-1 px-4 border rounded-sm text-center">{product.quantity}</span>
                        <IconButton onClick={() => handleUpdateCartItem(1)} sx={{ color: 'purple' }}>
                            <AddCircleOutlineIcon />
                        </IconButton>
                        <Button
                            onClick={handleRemoveCartItem}
                            color="secondary"
                            sx={{
                                color: 'purple',
                                '&:hover': {
                                    backgroundColor: 'purple',
                                    color: 'white',
                                },
                            }}
                        >
                            Remove
                        </Button>
                    </div>
                </div>
            </div>
</li>

    </div>
    )
}

export default CartItem
