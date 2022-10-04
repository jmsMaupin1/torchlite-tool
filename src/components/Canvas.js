import {useRef,useEffect} from 'react';

function Canvas(props) {
    const canvasRef = useRef(null)
  
    const draw = (ctx, frameCount) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        var image = document.getElementById("source");
        ctx.drawImage(image, 33, 71, 104, 124, 21, 20, 87, 104);
    }
    
    useEffect(() => {
      
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      let frameCount = 0
      let animationFrameId
      
      //Our draw came here
      const render = () => {
        frameCount++
        draw(context, frameCount)
        animationFrameId = window.requestAnimationFrame(render)
      }
      render()
      
      return () => {
        window.cancelAnimationFrame(animationFrameId)
      }
    }, [])
    
    return <canvas width={800} height={600} ref={canvasRef} {...props}/>
}
export default Canvas