import React from 'react'
import '../components/css/Home.css'
export default function () {
  return (
    <>
        {/* Carousel */}
        <div id="carouselExampleCaptions" class="carousel slide">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner carousel_slide_img">
                <div class="carousel-item active ">
                <img className='' src="https://i0.wp.com/theluxurytravelexpert.com/wp-content/uploads/2020/05/STONEHENGE-UNITED-KINGDROM.jpg?ssl=1" class="d-block w-100" alt="..."></img>
                <div class="carousel-caption d-none d-md-block">
                    <h5>First slide label</h5>
                    <p>Some representative placeholder content for the first slide.</p>
                </div>
                </div>
                <div class="carousel-item">
                <img src="https://i0.wp.com/theluxurytravelexpert.com/wp-content/uploads/2020/05/PETRA-JORDAN-1.jpg?ssl=1" class="d-block w-100" alt="..."></img>
                <div class="carousel-caption d-none d-md-block">
                    <h5>Second slide label</h5>
                    <p>Some representative placeholder content for the second slide.</p>
                </div>
                </div>
                <div class="carousel-item">
                <img src="https://c4.wallpaperflare.com/wallpaper/745/128/61/5bd341c9799cb-wallpaper-preview.jpg" class="d-block w-100" alt="..."></img>
                <div class="carousel-caption d-none d-md-block">
                    <h5>Third slide label</h5>
                    <p>Some representative placeholder content for the third slide.</p>
                </div>
                </div>
            </div>
        </div>

        {/* Data */}
        <div className='text-center'>
            Lorem Ipsum
        </div>
    </>
  )
}
