import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Icon, Pagination } from 'semantic-ui-react'

import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_TOTAL,
} from '../../constants'

import Table from '../../components/Table'
import { getPageTotal } from '../../utils/common'

const colomns = [
  {
    id: '1',
    field: 'id',
    header: 'ID',
  },
  {
    id: '2',
    field: 'content',
    header: 'CONTENT',
  },
  {
    id: '3',
    field: 'requestType',
    header: 'requestType',
  },
  {
    id: '4',
    field: 'ip',
    header: 'ip',
  },
  {
    id: '5',
    field: 'requestParam',
    header: 'requestParam',
  },
  {
    id: '6',
    field: 'requestUri',
    header: 'requestUri',
  },
  {
    id: '7',
    field: 'cost',
    header: 'cost',
  },
  {
    id: '8',
    field: 'createTime',
    header: 'createTime',
  },
]

const SysOpLogs = () => {
  const token = useSelector((state) => state.auth.token)
  const [current, setCurrent] = useState(DEFAULT_CURRENT_PAGE)
  const [size, setSize] = useState(DEFAULT_PAGE_SIZE)
  const [total, setTotal] = useState(DEFAULT_TOTAL)
  const [logs, setLogs] = useState(null)

  const totalPage = getPageTotal(size, total)
  // console.log('totalPage', totalPage)

  function handleClick(e, d) {
    const currentPage = d.activePage
    fetchData(currentPage, size)
    // console.log(e, d)
  }

  const fetchData = async (current, size) => {
    const response = await fetch(
      `/api/v1/log/findAllLogs?current=${current}&size=${size}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    if (!response.ok) {
      toast.error(response.statusText, {
        position: 'top-center',
        theme: 'light',
      })
    }
    const data = await response.json()
    setCurrent(data.data.current)
    setLogs(data.data.logs)
    setTotal(data.data.total)
  }
  useEffect(() => {
    fetchData(current, size)
  }, [token])

  return (
    <>
      <section style={{ minHeight: '620px', marginTop: '15px' }}>
        <Table
          key={colomns.id}
          data={logs}
          columns={colomns}
          striped={true}
          hover={true}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Pagination
            onPageChange={(e, d) => handleClick(e, d)}
            style={{
              marginTop: '20px',
              marginLeft: '20px',
            }}
            totalPages={totalPage}
            ellipsisItem={{
              content: <Icon name="ellipsis horizontal" />,
              icon: true,
            }}
            siblingRange={2}
            firstItem={null}
            lastItem={null}
            prevItem={null}
            nextItem={null}
            defaultActivePage={current}
          />
          <p style={{ marginTop: '15px' }}>total :{total}</p>
        </div>
      </section>
    </>
  )
}

export default SysOpLogs
