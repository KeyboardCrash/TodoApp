.PHONY: build buildx buildx-push

build:
	docker build $(NOCACHE) -t registry.keyboardcrash.com/todo-frontend:latest -f Dockerfile.multistage .

# Test cross-architecture build without pushing
buildx:
	docker buildx build --platform linux/amd64,linux/arm64 $(NOCACHE) -f Dockerfile.multistage .

# Build and push cross-architecture images
buildx-push:
	docker buildx build --platform linux/amd64,linux/arm64 $(NOCACHE) -t registry.keyboardcrash.com/todo-frontend:latest -f Dockerfile.multistage . --push

docker-build:
	docker build -t TodoApp/todo-frontend:latest -f Dockerfile .

clean:
	rm -rf build node_modules