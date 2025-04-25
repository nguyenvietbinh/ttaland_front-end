

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeOpen, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faLinkedin, faSquarePinterest, faTwitter } from "@fortawesome/free-brands-svg-icons";

const _topbar = () => {
  return (
    <div>
      <section id="top-bar" className="py-6 bg-gray-200 text-center">
              <div className="flex flex-wrap mx-[2vw] text-gray-700">
                  <div className="w-full items-center flex md:justify-start justify-center md:w-1/3 mb-2 md:mb-0">
                    <FontAwesomeIcon icon={faPhone} className=""></FontAwesomeIcon> 
                    <p className='whitespace-nowrap'>+91 1234567890</p>
                  </div>
                  <div className="w-full flex items-center justify-center md:w-1/3 mb-2 md:mb-0">
                    <FontAwesomeIcon icon={faEnvelopeOpen} className="fas fa-envelope-open mr-2"></FontAwesomeIcon>
                    <p className='whitespace-nowrap'>contact@realestate.com</p>
                  </div>
                  <div className="w-full md:w-1/3">
                      <div className="flex justify-center md:justify-end space-x-4">
                          <a href="#" className="text-gray-700 hover:text-blue-400">
                              <FontAwesomeIcon icon={faTwitter} className="fab fa-twitter"></FontAwesomeIcon>
                          </a>
                          <a href="#" className="text-gray-700 hover:text-blue-600">
                              <FontAwesomeIcon icon={faFacebook} className="fab fa-facebook"></FontAwesomeIcon>
                          </a>
                          <a href="#" className="text-gray-700 hover:text-blue-700">
                              <FontAwesomeIcon icon={faLinkedin} className="fab fa-linkedin"></FontAwesomeIcon>
                          </a>
                          <a href="#" className="text-gray-700 hover:text-pink-600">
                              <FontAwesomeIcon icon={faInstagram} className="fab fa-instagram"></FontAwesomeIcon>
                          </a>
                          <a href="#" className="text-gray-700 hover:text-red-600">
                              <FontAwesomeIcon icon={faSquarePinterest} className="fab fa-pinterest"></FontAwesomeIcon>
                          </a>
                      </div>
                  </div>
              </div>
      </section>
    </div>
  )
}

export default _topbar