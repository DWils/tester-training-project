import { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext'

const OrderView = () => {

    const { cart } = useContext(CartContext);

    const [showPaymentForm, setShowPaymentForm] = useState(false);

    const handlePaymentClick = () => {
        setShowPaymentForm(true);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted');
    };

    return (
        <div>
            {console.log("orders : ", cart)}
            {cart.map((product) => (
                <div key={product.id} className="d-flex align-items-center mb-3">
                    <img src={product.imageUrl} alt={product.title} className="img-thumbnail mr-3" style={{ width: '50px', height: '50px' }} />
                    <div className="flex-grow-1">
                        <h5>{product.title}</h5>
                        <p>{(product.price || 0).toFixed(2)} €</p>
                        <div className="d-flex align-items-center">
                            <span>{product.quantity || 0}</span>
                        </div>
                    </div>
                </div>
            ))}
            <button onClick={handlePaymentClick} className="btn btn-primary mt-3">Proceed to Payment</button>

            {showPaymentForm && (
                <form onSubmit={handleFormSubmit} className="mt-3">
                    <div className="form-group">
                        <label htmlFor="cardNumber">Card Number</label>
                        <input type="text" className="form-control" id="cardNumber" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cardDate">Card Expiry Date</label>
                        <input type="text" className="form-control" id="cardDate" placeholder="MM/YY" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ccv">CCV</label>
                        <input type="text" className="form-control" id="ccv" required />
                    </div>
                    <button type="submit" className="btn btn-success">Submit Payment</button>
                </form>
            )}
        </div>
    )
}

export default OrderView