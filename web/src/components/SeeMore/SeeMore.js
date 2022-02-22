const SeeMore = ({ to }) => {
  return (
    <button onClick={to} className=" seeMore_Link hover:scale-[1.05]">
      <img
        src="/logo.png"
        alt="see-more-icon"
        className="h-[130px] w-[130px]"
      />
      <h3>See More</h3>
    </button>
  )
}

export default SeeMore
