1. docker login
2. docker build -t userId/imageName:tag .
3. docker push userId/imageName:tag
4. kubectl get configmaps
5. kubectl get statefulset
6. kubectl scale statefulsets postgres-statefulset --replicas=0
#### increase load on pod
7. kubectl exec server-replicaset-457pf -- ../bin/sh -c "while true; do echo 'CPU stress'; done"
#### delete pod to decrease the load
8. kubectl delete pod podname

#### Metrics Server
kubectl get deployment metrics-server -n kube-system

kubectl create secret generic pgpassword --from-literal=PGPASSWORD=your_actual_password


#manage some no of pods  - workload resource
replicaset --deprecated
deployments
stateful-set

#stablished communication b/w pods - services (enabled networking)
clusterip
node-port
loadbalancer --deprecated

containers -> pods -> services (clusterip/node-port/loadbalancer) -> replicaset/deployment -> master node