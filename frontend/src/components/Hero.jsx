import React from 'react'

const Hero = () => {
  return (
    
    <section className="bg-primary py-4 mb-2">
        <div className="container-xl mx-auto px-3 px-sm-4 px-lg-5 d-flex flex-column align-items-center">
            <div className="text-center">
        
                <h1 className="text-black fw-bold display-4 display-sm-3 display-md-2">
                    Welcome to the Meal Planner!
                </h1>
                <p className="my-4 fs-4 text-black">
                    Are you struggling to figure out what to make for dinner this week? Well we can help! Simply register 
                    and you can start adding your meals to help create a plan, or browse meals from other users!
                </p> 
            </div>
        </div>
    </section>
    
  )
}

export default Hero