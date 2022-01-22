import { useParams } from "react-router-dom"

export default function Invite() {
  const { roomId } = useParams()
  return <p>Welcome to room {roomId}!</p>
}
