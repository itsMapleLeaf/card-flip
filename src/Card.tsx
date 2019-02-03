import React from "react"

type CardProps = {
  image: string
  onClick: () => void
  isVisible: boolean
}

const Card = ({ image, onClick, isVisible }: CardProps) => (
  <a
    className={`card-container ${isVisible ? "card-visible" : ""}`}
    href="#"
    role="button"
    onClick={(event) => {
      event.preventDefault()
      onClick()
    }}
    onDragStart={(event) => event.preventDefault()}
  >
    <div className="card-content" />
    <div className="card-content card-text">{image}</div>
  </a>
)
export default Card
