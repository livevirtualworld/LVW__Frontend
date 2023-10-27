import React from 'react'
import BookingStyle from './BookingRolesModal.module.css'
import Logo from '../../assets/logo.png'








function BookingRolesModal() {
    return (
        <div className={BookingStyle['modall__content']}>
            <div className={BookingStyle['modal__header']}>
                <h4>Confirm Booking</h4>
                <img src={Logo} alt='' />
            </div>
            <div className={BookingStyle['modal__body']}>
                <h2>Are you sure you want to book this tour?</h2>
                <p>1) If you need to cancel the tour you have booked, you can do so up to 24 hours before the scheduled tour date.</p>
                <p>2) To request a tour cancellation, please contact us at <span>LVW@support.com</span>. We will guide you through the cancellation process and initiate a refund if the trip was pre-paid.</p>
                <p>3) There are no fees associated with the cancellation process.</p>
                <div className={BookingStyle['modal__buttons']}>
                    <button>Cancel</button>
                    <button>Cofirm</button>
                </div>
            </div>
        </div>
    );
}

export default BookingRolesModal;