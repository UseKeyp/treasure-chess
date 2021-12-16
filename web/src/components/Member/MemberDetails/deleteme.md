  <div className="MemberDetails__content flex flex-col justify-between text-right">
    <div className="flex items-center flex-wrap justify-end">
      <p className="MemberDetails__text MemberDetails__text--small">
        <span className="MemberDetails__coloredText">Treasures:</span>{' '}
      </p>
      <div className="MemberDetails__logoWrapper MemberDetails__text flex items-start">
        <img
          className="MemberDetails__logo"
          src=""
          aria-hidden
          alt=""
        />{' '}
        <span>{treasureCount}</span>
      </div>
    </div>
    <p className="MemberDetails__text MemberDetails__coloredText">
      $
      {memberBalance.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </p>
  </div>
</div>

{member.address && (
<div className="MemberDetails__addressWrapper">
)}

</div>
