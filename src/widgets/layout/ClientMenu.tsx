import { FC, useEffect, useState } from 'react'
import { useGetAllOrganizationsQuery } from '@/app/store/index.endpoints'
import { useActions } from '@/features/hooks/useActions'
import { useSelectors } from '@/features/hooks/useSelectors'
import { Link, useNavigate } from 'react-router-dom'
import logo from '@/shared/img/logo.svg'
import { useWindowSize } from '@/features/hooks/useWindowSize'
import { MdChildCare } from 'react-icons/md'
import { IoIosSchool, IoMdClose } from 'react-icons/io'
import { IoMenu } from 'react-icons/io5'

type MenuProps = {
  key: number
  org: number
  label: string
}

const ClientMenu: FC = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const { data, isSuccess } = useGetAllOrganizationsQuery()
  const [menuItems, setMenuItems] = useState<MenuProps[]>([])
  const { setMainSelectedOrganization } = useActions()
  const { mainSelectedOrganization } = useSelectors()
  const [width] = useWindowSize()
  const navitate = useNavigate()

  console.log(menuItems)
  const handleClickRoute = (id: string) => {
    navitate('/')
    setMainSelectedOrganization(id)
  }

  useEffect(() => {
    if (data) {
      const mapped = data.data.map((el) => ({
        key: el.id,
        org: el.org,
        label: el.name,
      }))
      setMenuItems(mapped)
    }
  }, [isSuccess])

  return (
    <div
      className={
        width > 1000
          ? 'fixed flex flex-col gap-y-5 min-h-screen z-50 w-[200px] overflow-auto'
          : 'fixed bg-white shadow-lg z-50 top-0 w-screen h-[100px] flex items-center justify-between px-[5%]'
      }
    >
      <Link
        to="/"
        className="flex lg:flex-col whitespace-nowrap items-center justify-start gap-3 my-10 mx-auto max-sm:flex-1"
      >
        <img
          src={logo}
          alt="logo"
          width={width > 1000 ? '75' : '25'}
          height={width > 1000 ? '75' : '25'}
        />
        <span className={width > 1000 ? 'text-3xl' : 'text-sm'}>FACE ID</span>
      </Link>
      <div className="sm:hidden">
        {!openMenu && (
          <IoMenu
            size="30"
            className="z-[999] cursor-pointer"
            onClick={() => setOpenMenu((s) => !s)}
          />
        )}
        <div
          className={`bg-[#DFF5FF] h-screen w-screen absolute transition-all ${
            openMenu ? 'top-0 left-0' : 'top-0 left-[100vw]'
          }`}
        >
          <div className="h-[100px] flex items-center justify-end">
            <IoMdClose
              size="30"
              className="z-[999] cursor-pointer absolute top-5 right-5 my-4 mx-3"
              onClick={() => setOpenMenu((s) => !s)}
            />
          </div>
          <div className="flex flex-col text-black gap-3 font-semibold items-center justify-center ">
            {menuItems?.map((item) => {
              return (
                <div
                  onClick={() => handleClickRoute(item.key.toString())}
                  key={item?.key}
                  className={`flex lg:w-full max-lg:w-fit items-center gap-3 text-lg lg:p-5 max-lg:p-2 rounded-xl cursor-pointer hover:bg-[#0000001a]
              ${+mainSelectedOrganization === item?.key ? 'bg-[#0000002a]' : ''}
              `}
                >
                  <span className="lg:block max-lg:hidden">
                    {+item?.org === 1 ? <MdChildCare /> : <IoIosSchool />}
                  </span>
                  {item?.label}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="flex lg:flex-col gap-y-2 w-full justify-end max-lg:flex-row max-sm:hidden">
        {menuItems?.map((item) => {
          return (
            <div
              onClick={() => handleClickRoute(item.key.toString())}
              key={item?.key}
              className={`flex lg:w-full max-lg:w-fit items-center gap-3 text-lg lg:p-5 max-lg:p-2 rounded-xl cursor-pointer hover:bg-[#0000001a]
              ${+mainSelectedOrganization === item?.key ? 'bg-[#0000002a]' : ''}
              `}
            >
              <span className="lg:block max-lg:hidden">
                {+item?.org === 1 ? <MdChildCare /> : <IoIosSchool />}
              </span>
              {item?.label}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export { ClientMenu }
