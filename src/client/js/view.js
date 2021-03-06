import { diffDays } from '../utils/utils'

/**
 *
 * @param trips contain all the trips that user want to travel
 */
const populateAllTrips = (trips) => {
  // Container that will contains all the trips
  const tripsContainer = document.getElementById('trips')
  // Clear old trips from dom
  tripsContainer.innerHTML = ''
  // Creates a new empty DocumentFragment into which DOM nodes can
  // be added to build an offscreen DOM tree.
  const fragment = document.createDocumentFragment()
  // handle if there's no trips
  if (trips.length === 0) {
    tripsContainer.innerHTML = '<h4 class="no-trips">No Trips available, search and save yours</h4>'
  }
  // Iterate for all the trips retrieved from the backend and populate it to the view
  trips.forEach((trip) => {
    const tripEl = document.createElement('div')
    tripEl.classList.add('card')
    tripEl.classList.add('accordion-item')

    tripEl.innerHTML = `
      <div class="card-header accordion-header" 
                style="background-image: url(${trip.imageURL})" id=${trip.id}-${trip.city}>
        <button class="accordion-button" type="button" data-toggle="collapse"
                data-target=#${trip.id} aria-expanded="true" aria-controls=${trip.id}>
          <img class="accordion-img" src=${trip.countryFlag} alt="flag"> ${trip.city}
            <i class="arrow down"></i>
        </button>
      </div>
      <div id=${trip.id} class="collapse show" aria-labelledby=${trip.id}-${
      trip.city
    } data-parent="#trips">
        <div class="accordion-body">
          <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-xs-12 col-md-6">
                       <div class="card-info">
                            <h6><strong>Check In</strong></h6>
                            <p>${trip.start}</p>
                       </div>
                    </div>
                    <div class="col-xs-12 col-md-6">
                      <div class="card-info">
                        <h6><strong>Check Out</strong></h6>
                        <p>${trip.end}</p>
                      </div>
                    </div>  
                    <div class="col-xs-12 col-md-6">
                      <div class="card-info">
                        <h6><strong>Duration</strong></h6>
                        <p>${diffDays(trip.start, trip.end)} Days</p>
                      </div>
                    </div>
                    <div class="col-xs-12 col-md-6">
                      <div class="card-info">
                         <h6><strong>Weather Forecast</strong></h6>
                         <p>${trip.weatherForecast}</p>
                      </div>
                    </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
    // append trip to virtual DOM element
    fragment.appendChild(tripEl)
  })
  // append trips to trips-container
  tripsContainer.appendChild(fragment)
  $('.collapse').slice(1).collapse()
}

/**
 * Modal Confirmation for the user to save the trip if it suitable for him/her
 * @param city
 * @param start
 * @param end
 * @param countryCode
 * @param country
 * @param countryFlag
 * @param weatherForecast
 * @param imageURL
 */
const showModal = ({
  city,
  start,
  end,
  countryCode,
  country,
  countryFlag,
  weatherForecast,
  imageURL,
}) => {
  document.querySelector('.modal-title__flag').setAttribute('src', countryFlag)
  document.querySelector('.modal-title__flag').setAttribute('alt', country)

  document.querySelector('.modal-title__text').textContent = `${city}, ${country}`

  document.querySelector('.modal-body__image').setAttribute('src', imageURL)
  document.querySelector('.modal-body__image').setAttribute('alt', country)

  document.querySelector('.card-info__check-in').textContent = `${start}`
  document.querySelector('.card-info__check-out').textContent = `${end}`
  document.querySelector('.card-info__duration').textContent = `${diffDays(start, end)} Days`

  document.querySelector('.card-info__forecast').textContent = `${weatherForecast}`
  document.querySelector('.card-info__code').textContent = `${countryCode}`
  // trigger modal
  $('#trip-overview-modal').modal({
    keyboard: false,
  })
}

export { showModal, populateAllTrips }
