import React from 'react'
import { Link } from 'react-router-dom'
import { MdKeyboardArrowRight } from 'react-icons/md'

import { StyledBreadcrumbCon, StyledBreadcrumbItemCon, StyledBreadcrumbItem } from 'theme'

type BreadcrumbComProps = {
  data: any
  isContainer: boolean
}

export const BreadcrumbCom: React.FC<BreadcrumbComProps> = ({data, isContainer = true, ...props}) => {

  return (
    <StyledBreadcrumbCon {...props}>
      <div className={isContainer ? 'container' : 'container-fluid'}>
        <StyledBreadcrumbItemCon>
          {data?.length > 0 &&
            data?.map((x: any, i: number) => (
              <StyledBreadcrumbItem key={i} {...x}>
                <Link to={x?.route || '/'} {...x}>
                  {x?.name}
                </Link>
                <MdKeyboardArrowRight />
              </StyledBreadcrumbItem>
            ))}
        </StyledBreadcrumbItemCon>
      </div>
    </StyledBreadcrumbCon>
  )
}
