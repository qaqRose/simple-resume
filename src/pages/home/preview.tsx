import React, {
  createContext, useMemo, useRef,
} from 'react'

import DraggableResizableBackground from '@/components/DraggableResizableBackground'
import { usePrint } from '@/hooks'
import { useAppStore } from '@/store'

import Footer from './components/Footer'
import Header from './components/Header'

import PreviewTemplate from '../../components/PreviewTemplate/Template'
import { useResumeStore } from '../../store/resume'

import './preview.css'

export interface IPreviewContext {
  previewRef: React.RefObject<any>
  printResume: () => void
}

export const PreviewContext = createContext<IPreviewContext>({} as IPreviewContext)

const Preview = () => {
  const { previewMode } = useAppStore()
  const {
    resumeStyle,
    resumeData,
  } = useResumeStore()

  const previewEl = useRef<HTMLDivElement>(null)
  const previewParent = useRef<HTMLDivElement>(null)

  const { print } = usePrint(previewEl)

  const ctxValue = useMemo(() => ({
    printResume: print,
    previewRef: previewEl,
  }), [resumeData])

  return (
    <PreviewContext.Provider value={ctxValue}>
      <Header />

      {/* S Preview */}
      <DraggableResizableBackground gridBackground>
        <div
          ref={previewParent}
          className="preview-container h-full flex justify-center items-center relative mb-16"
        >
          {/* <Draggable> */}
          <div
            id="preview-target"
            style={{
              padding: resumeStyle.pagePadding.value,
              boxShadow: previewMode ? 'none' : '0 0 3px rgba(0,0,0,.3)',
            }}
          >
            <div ref={previewEl} className="bg-white">
              {
                resumeData.map((resume, i) => (
                  <PreviewTemplate
                    key={i}
                    {...resume}
                  />
                ))
              }
            </div>

          </div>
        </div>
      </DraggableResizableBackground>
      {/* E Preview */}

      <Footer />
    </PreviewContext.Provider>
  )
}

export default Preview
