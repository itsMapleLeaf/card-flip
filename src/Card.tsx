import React from "react"

type CardProps = {
  image: string
  onSelect: () => void
  isVisible: boolean
}

const Card = ({ image, onSelect, isVisible }: CardProps) => (
  <a
    className={`card-container ${isVisible ? "card-visible" : ""}`}
    href="#"
    role="button"
    onMouseUp={(event) => {
      event.preventDefault()
      onSelect()
    }}
    onDragStart={(event) => event.preventDefault()}
  >
    <div className="card-content" />
    <div className="card-content card-text">{image}</div>
  </a>
)
export default Card
