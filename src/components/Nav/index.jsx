import { Link } from 'react-router-dom'
import { Popup } from 'semantic-ui-react'

import styles from './nav.module.css'

import { navData } from './nav'

function Nav() {
  return (
    <>
      <nav>
        <ul className={styles.NavItem}>
          {navData.map((item) => {
            return (
              <li key={item.id}>
                <Link to={{ pathname: item.path }} state={item?.state}>
                  <Popup
                    trigger={<span>{item.icon}</span>}
                    content={item.title}
                    position="bottom center"
                  />
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}

export default Nav
