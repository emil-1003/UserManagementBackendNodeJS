# UserManagementBackendNodejs

### **How to setup project in docker**
```bash
# Build image
$ cd project/Dockerfile

$ sudo docker build -t [name] .

# Start container by running image
# 1. --name set name
# 2. -p set ports
# 3. -d run in background
$ sudo docker run --name=[name] -p 80:8888 -d [image name]
```

---
> *Created by - Emil Andersen - 2023*
