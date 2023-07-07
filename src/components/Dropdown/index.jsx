import { useState } from 'react'
import styles from './dropdown.module.css'
import { Icon } from 'semantic-ui-react'
function Dropdown({
  selected,
  setSelected,
  options,
  placeholder = 'Please select',
}) {
  const [isActive, setIsActive] = useState(false)

  return (
    <div className={styles.Dropdown}>
      <div
        className={styles.DropdownBtn}
        onClick={() => setIsActive(!isActive)}
      >
        {selected !== '' ? selected : placeholder}
        <Icon name="dropdown" />
      </div>
      {isActive && (
        <div className={styles.DropdownContent}>
          {options &&
            options.map((option) => {
              return (
                <div
                  key={option.categoryId}
                  className={styles.DropdownItem}
                  onClick={(e) => (
                    setSelected(e.target.textContent), setIsActive(false)
                  )}
                >
                  {option.categoryName}
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}

export default Dropdown
