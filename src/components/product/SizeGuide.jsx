import SizeGuideImage from "../../assets/size-guide.jpg";

const SizeGuide = () => {
  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold mb-8">
        Size Guide
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Size Guide Image */}
        <div className="flex justify-center">
          <img
            src={SizeGuideImage}
            alt="Shirt Size Guide"
            className="rounded-xl shadow-md max-w-sm w-full"
          />
        </div>

        {/* Size Table */}
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Size</th>
                <th>Shoulder</th>
                <th>Chest</th>
                <th>Length</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>38</td>
                <td>17"</td>
                <td>20.5"</td>
                <td>26"</td>
              </tr>

              <tr>
                <td>39</td>
                <td>18"</td>
                <td>21.5"</td>
                <td>27"</td>
              </tr>

              <tr>
                <td>40</td>
                <td>19"</td>
                <td>22.5"</td>
                <td>28"</td>
              </tr>

              <tr>
                <td>42</td>
                <td>20"</td>
                <td>23.5"</td>
                <td>29"</td>
              </tr>

              <tr>
                <td>44</td>
                <td>20.75"</td>
                <td>25.25"</td>
                <td>29.75"</td>
              </tr>

              <tr>
                <td>46</td>
                <td>21.5"</td>
                <td>26.5"</td>
                <td>30.5"</td>
              </tr>
            </tbody>
          </table>

          <p className="mt-4 text-sm text-base-content/60">
            * All measurements are in inches. Slight variations (±0.5") may
            occur due to manual measurement.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SizeGuide;