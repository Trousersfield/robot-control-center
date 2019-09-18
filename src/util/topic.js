const listeners = [
  /* // goal position to move robot
  { name: '/panda_movement_bridge/PoseListener', messageType: 'geometry_msgs/Pose' },
  { name: '/panda_movement_bridge/StopListener', messageType: 'std_msgs/Bool' },
  // recover robot from error state
  { name: '/franka_control/error_recovery/goal', messageType: 'franka_control/ErrorRecoveryActionGoal' },
  // gripper
  { name: '/panda_movement_bridge/GripperListenerMove', messageType: 'franka_gripper/MoveGoal' },
  { name: '/panda_movement_bridge/GripperListenerGrasp', messageType: 'franka_gripper/GraspGoal' },
  // robot speed
  { name: '/panda_movement_bridge/SpeedListener', messageType: 'std_msgs/Float64' } */
]

const publishers = [
  // robot speed
  /* { name: '/panda_movement_bridge/SpeedPublisher', messageType: 'std_msgs/Float64' },
  // current robot position in sphere
  { name: '/panda_movement_bridge/PosePublisher', messageType: 'geometry_msgs/Pose' },
  // robot's gripper's states
  { name: '/franka_gripper/joint_states', messageType: 'sensor_msgs/JointState' } */
]

export default {
  listeners, publishers
}
