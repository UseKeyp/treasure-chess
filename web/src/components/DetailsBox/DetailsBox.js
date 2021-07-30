const DetailsBox = ({ items, heading }) => {
  return (
    <div className="detailsBox flex flex-col">
      <p className="detailsBox__heading">{heading}</p>
      <div className="detailsBox__items-wrapper">
        {items.map((item, i) => (
          <p className="detailsBox__item" key={i}>
            {item}
          </p>
        ))}
      </div>
    </div>
  )
}

export default DetailsBox
