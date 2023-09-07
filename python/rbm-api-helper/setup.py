import setuptools

setuptools.setup(
   name='rcs_business_messaging',
   version='1.0',
   author="Google LLC",
   description='RBM python helper library',
   license="Apache 2.0",
   packages=setuptools.find_packages(),
   classifiers=[
        "Programming Language :: Python :: 3",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: Apache Software License",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.6',
)
