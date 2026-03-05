.PHONY: build buildx buildx-push

build:
	docker build $(NOCACHE) -t registry.keyboardcrash.com/todo-backend:latest -f Dockerfile .

# Test cross-architecture build without pushing
buildx:
	docker buildx build --platform linux/amd64,linux/arm64 $(NOCACHE) -f Dockerfile .

# Build and push cross-architecture images
buildx-push:
	docker buildx build --platform linux/amd64,linux/arm64 $(NOCACHE) -t registry.keyboardcrash.com/todo-backend:latest -f Dockerfile . --push
