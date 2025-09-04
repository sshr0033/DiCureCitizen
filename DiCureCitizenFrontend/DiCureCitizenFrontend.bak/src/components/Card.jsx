export default function Card({ title, text, button, href, image, flipped=false }) {
  return (
    <div className={`feature ${flipped ? 'flipped' : ''}`}>
      {image && <img src={image} alt="" className="feature-img" />}
      <div className="feature-text">
        {title && <h3 className="h3">{title}</h3>}
        {text && <p className="p">{text}</p>}
        {button && href && <a className="btn pill" href={href}>{button}</a>}
      </div>
    </div>
  )
}
