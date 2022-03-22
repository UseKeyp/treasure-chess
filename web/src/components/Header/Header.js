import { useCallback, useEffect } from 'react'
import TooltipTrigger from 'react-popper-tooltip'
import { routes, useLocation } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { useWallet } from 'src/providers/wallet'

import Icon from 'src/components/Icon/Icon'
import Avatar from 'src/components/Avatar/Avatar'
import Button from 'src/components/Button/Button'
import MobileMenu from 'src/components/MobileMenu/MobileMenu'

import MemberBalance from 'src/components/Member/MemberBalance'

import { trimAddress } from 'src/utils/helpers'

const Tooltip = ({
  arrowRef,
  tooltipRef,
  getArrowProps,
  getTooltipProps,
  placement,
}) => (
  <div
    {...getTooltipProps({
      ref: tooltipRef,
    })}
  >
    <div
      {...getArrowProps({
        ref: arrowRef,
        'data-placement': placement,
      })}
    />
    <h4 className={'header__tooltip'}>Log out</h4>
  </div>
)

const WalletBalance = () => {
  const { deposit } = useWallet()
  return (
    <div className="flex flex-col flex-1 text-sm">
      <div className={'header__nav__balance'}>
        <MemberBalance />
      </div>
      <div>
        <Button
          onClick={deposit}
          textColor="blue"
          className={'header__nav__fund-wallet'}
        >
          Add Funds
        </Button>
      </div>
    </div>
  )
}

const MobileNav = () => {
  const { isAuthenticated: isLoggedIn, logOut } = useAuth()
  const { pathname } = useLocation()

  const isOnTreasuresPage = pathname === '/treasures'
  const isOnAboutPage = pathname === '/about'

  const navItemClasses = 'block text-center mt-4 flex'
  const navAnchorClasses = 'text-center w-full font-bold'

  return (
    <MobileMenu triggerContents="Menu">
      <div className="flex-1 flex justify-center">
        <nav>
          <ul className="h-full relative grid place-items-center">
            <li className={navItemClasses}>
              <Button to={routes.home()}>
                <Icon name="treasure_chess_full_white" />
                <span className="sr-only">home</span>
              </Button>
            </li>
            <li className={navItemClasses}>
              <Button isSelected={isOnTreasuresPage} to={routes.treasures()}>
                Treasures
              </Button>
            </li>
            <li className={navItemClasses}>
              <Button
                isSelected={isOnAboutPage}
                to={routes.faq()}
                className={navAnchorClasses}
              >
                About
              </Button>
            </li>
            <li className={`${navItemClasses} mx-auto`}>
              <Button
                href="https://airtable.com/shrWkB9MS13NXoM46"
                target="_blank"
                size="large"
              >
                <h3 className="text-[30px] font-bold">Feedback</h3>
              </Button>
            </li>
            {!isLoggedIn ? (
              <li className={navItemClasses}>
                <Button className={navAnchorClasses} to={routes.login()}>
                  Log In
                </Button>
              </li>
            ) : (
              <>
                <li className={navItemClasses}>
                  <Button className={navAnchorClasses} to={routes.profile()}>
                    Profile
                  </Button>
                </li>
                <li className={navItemClasses}>
                  <Button className={navAnchorClasses} onClick={logOut}>
                    Log Out
                  </Button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </MobileMenu>
  )
}

const Header = () => {
  const {
    isAuthenticated: isLoggedIn,
    currentUser: profile,
    logOut,
  } = useAuth()
  const { pathname } = useLocation()

  const isOnTreasuresPage = pathname === '/treasures'
  const isOnAboutPage = pathname === '/about'

  const imageSrc = profile?.imageSrc || null

  const address = trimAddress(profile?.address) || 'No address set'

  const handleUserStatus = useCallback(() => {
    if (profile !== null && profile?.banned) {
      logOut()
    }
  }, [profile, logOut])

  useEffect(() => {
    handleUserStatus()
  }, [handleUserStatus])

  return (
    <div className={'header'}>
      <Button to={routes.home()} className="mr-4 align-center">
        <Icon name="treasure_chess_full" height="35px" color="#fff" />
      </Button>
      <div className="flex flex-1 items-center justify-end lg:hidden">
        <MobileNav />
      </div>
      <div className={'header__nav hidden lg:flex'}>
        <div className="flex-1 flex items-center">
          <div className="mr-4">
            <Button
              to={routes.treasures()}
              size="large"
              isSelected={isOnTreasuresPage}
            >
              <div className="flex items-center">
                <div className="mr-2">
                  <Icon name="treasure_chess" color="#ffffff" height="16px" />
                </div>
                Treasures
              </div>
            </Button>
          </div>
          <div className="mr-4">
            <Button to={routes.faq()} size="large" isSelected={isOnAboutPage}>
              <div className="flex items-center">
                <img src="/icons/HelpIcon.svg" alt="" className="mr-2" />
                About
              </div>
            </Button>
          </div>
          <Button
            href="https://airtable.com/shrWkB9MS13NXoM46"
            target="_blank"
            size="large"
          >
            <div className="flex items-center">
              <div className="mr-2">
                <Icon name="book" />
              </div>
              Feedback
            </div>
          </Button>
        </div>
        {isLoggedIn ? (
          <div className="flex items-center">
            <div className="mr-4 w-8 h-8 flex items-center justify-center">
              <Avatar size="32px" src={imageSrc} />
            </div>
            <div className="mr-4">
              <div className="flex flex-col text-sm text-left">
                <Button
                  to={routes.profile()}
                  textColor="blue"
                  className="header__nav__username"
                >
                  {profile?.username}
                </Button>
                <div className="header__nav__address">{address}</div>
              </div>
            </div>
            <WalletBalance />
            <div className="ml-4">
              <TooltipTrigger
                placement="bottom"
                trigger="hover"
                tooltip={Tooltip}
              >
                {({ getTriggerProps, triggerRef }) => (
                  <span
                    {...getTriggerProps({
                      ref: triggerRef,
                      className: 'trigger',
                      /* your props here */
                    })}
                  >
                    {/* Click Me! */}
                    <Button
                      onClick={logOut}
                      {...getTriggerProps({
                        ref: triggerRef,
                        className: 'trigger',
                        /* your props here */
                      })}
                    >
                      <Icon name="logout" color="grey" />
                    </Button>
                  </span>
                )}
              </TooltipTrigger>
            </div>
          </div>
        ) : (
          <Button to={routes.login()}>Log In</Button>
        )}
      </div>
    </div>
  )
}

export default Header
