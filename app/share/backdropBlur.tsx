import "../styles/share/backdropBlur.scss"

const BackdropBlur = ({isOPen}: {isOPen: boolean}) => {
  return isOPen && <div className="backdrop-blur" />
}

export default BackdropBlur