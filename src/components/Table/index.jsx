import React from 'react'

import styles from './table.module.css'

const Table = ({
  data = null,
  columns = null,
  hover = true,
  striped = true,
}) => {
  // 转换为大写
  const getCaps = (head, field) => {
    if (head) return head.toUpperCase()
    return field.toUpperCase()
  }

  return (
    <div>
      <table className={`${styles.Table} ui celled table`}>
        {/* 头部 */}
        <thead>
          <tr>
            {columns &&
              columns.map((head) => (
                <th key={head.id}>{getCaps(head.header, head.field)}</th>
              ))}
          </tr>
        </thead>
        {/* 主体 */}
        <tbody>
          {data &&
            data.map((row) => (
              <tr
                key={row.id}
                className={`${hover && 'hover'} ${striped && 'striped'}`}
              >
                {columns.map((col) => (
                  <td>{row[col.field].slice(0, 100)}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      {data ? null : <p>No Row to show</p>}
    </div>
  )
}

export default Table
