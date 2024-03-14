import './styles/index.scss'
import AppLayout from "./shared/layout"
import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from './pages'
import { ConfigProvider } from 'antd'
import RenderIf from './shared/components/RenderIf'
import ForgotPassword from './pages/ForgotPassword'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'

function App() {

  const lightTheme = {
    token: {
      colorBgLayout: '#dad3db'
    },
    components: {
      Menu: {
        // itemSelectedBg: '#6643c2',
        itemSelectedColor: '#fff',
      },
      Table: {
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
      },
      Steps: {
        colorPrimary: '#6643c2',
      },
      Layout: {
        headerBg: 'white'
      }
    }
  }

  const darkTheme = {
    token: {
      colorBgBase: '#29213f',
      colorPrimary: 'white',
      colorTextBase: 'white'
    },
    components: {
      Menu: {
        itemSelectedBg: '#6643c2',
        itemSelectedColor: '#fff'
      },
      Tag: {
        colorBgLayout: 'transparent'
      }
    }
  }

  const { profile, theme } = useSelector((state: RootState) => ({
    theme: state.theme.theme,
    profile: state.profile.myProfile
  }))

  return <>
    <RenderIf
      condition={profile}
    >
      <ConfigProvider
        theme={theme === 'light' ? lightTheme : darkTheme}
      >
        <AppLayout />
      </ConfigProvider>
    </RenderIf>
    <RenderIf
      condition={!profile}
    >
      <ConfigProvider
        theme={theme === 'light' ? lightTheme : darkTheme}
      >
        <Routes>
          <Route index path='/login' element={<Login />} />
          <Route index path='/forgot-password' element={<ForgotPassword />} />
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
      </ConfigProvider>
    </RenderIf>
  </>
}

export default App