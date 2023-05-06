import React from 'react';

export default function Loader() {
    return (
        <div className='text-center my-3'>
            <button className="btn btn-primary" type="button" disabled>
                Loading...
                <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
            </button>
        </div>
    )
}
