import React from 'react'

import { useResumeStore } from '@/store'

import type { IResumeInfoData } from '@/store/resume'

import Text from '../Text/Text'

export type InfoTemplateProps = IResumeInfoData

const InfoTemplate0: React.FC<IResumeInfoData> = (props) => {
  const {
    name, avatar, items,
  } = props
  const { resumeStyle } = useResumeStore()

  return (
    <div>

      <div className="flex items-start">
        {
          avatar
            ? (<img
              src={avatar}
              alt="Avatar"
              width={resumeStyle.avatarWidth}
              style={{ borderRadius: resumeStyle.avatarRounded ? '50%' : 0 }}
            />
            )
            : null
        }
        <div className="info-container ml-4">
          <div className="info-name">{name}</div>
          <div
            className="info-desc-container grid text-sm"
            style={{
              gridTemplateColumns: `repeat(${resumeStyle.infoItemsColumn}, minmax(0, 1fr))`,
            }}
          >
            {
              items.length && items.map((item, i) => (
                <Text classes="flex items-center" key={i} {...item} />
              ))
            }
          </div>
        </div>
      </div>
      <div
        style={{
          height: 1,
          backgroundColor: resumeStyle.lineBelowInfo,
        }}
        className="my-6"
      />
    </div>
  )
}

export default InfoTemplate0