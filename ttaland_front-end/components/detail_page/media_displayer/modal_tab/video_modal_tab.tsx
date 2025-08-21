'use client'

import { MediaItem } from "../media_displayer"

interface Video_modal_tab_props {
  mediaItems: MediaItem[]
}


const Video_modal_tab = ({mediaItems}: Video_modal_tab_props) => {

  return (
    <div>
      {mediaItems[0].type}
    </div>
  )
}


export default Video_modal_tab